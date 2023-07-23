import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios'; // API istekleri yapmak için
import { Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../features/activities/dashboard/ActivityDashboard';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]); // 'activities' state'i boş bir diziyle başlatılır.
  const [selectedActivity, setSelectedActivity] = useState< // 'selectedActivity' state'i başlangıçta 'undefined' ayarlanır.
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // useEffect ile component yüklendiğinde bir kez çağrılan bir işlev tanımlanır. 
    // Bu işlev API'den activities alıp state günceller.
    axios
      .get<Activity[]>('http://localhost:5000/api/activities') // API'den etkinlikleri al.
      .then((response) => {
        setActivities(response.data); // API yanıtındaki activities'i 'activities' state'ine ayarla.
      });
  }, []); // Boş dizi etkileşimin yalnızca bir kez çalıştırılmasını sağlar.
  

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find((x) => x.id === id));
  } // id ile belirli bir activity seçilir.

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  } // Seçili activity iptali ve 'selectedActivity' durumunu 'undefined' hale getirme

  function handleFormOpen(id?: string) { // id var mı? varsa activity vardır ve 'handleSelectActivity' işlevi çağrılır:
    id ? handleSelectActivity(id) : handleCancelSelectActivity(); // yoksa cancel edilir ve EditMode açılır:
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    activity.id 
      ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
      : setActivities([...activities, activity]);
    setEditMode(false);
    setSelectedActivity(activity);
  }

  return (
    <div>
      <>
        <NavBar openForm={handleFormOpen} />
        <Container style={{ marginTop: '7em' }}>
          <ActivityDashboard
            activities={activities}
            selectedActivity={selectedActivity}
            selectActivity={handleSelectActivity}
            cancelSelectActivity={handleCancelSelectActivity}
            editMode = {editMode}
            openForm = {handleFormOpen}
            closeForm = {handleFormClose}
            createOrEdit = {handleCreateOrEditActivity}
          />
        </Container>
      </>
    </div>
  );
}
export default App;
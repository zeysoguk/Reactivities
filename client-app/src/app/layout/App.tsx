import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]); // 'activities' state'i boş bir diziyle başlatılır.
  const [selectedActivity, setSelectedActivity] = useState<
    // 'selectedActivity' state'i başlangıçta 'undefined' ayarlanır.
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list().then((response) => {
      let activities: Activity[] = [];
      response.forEach((activity) => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      });
      setActivities(activities);
      setLoading(false);
    });
  }, []);
  // Boş dizi etkileşimin yalnızca bir kez çalıştırılmasını sağlar.

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find((x) => x.id === id));
  } // id ile belirli bir activity seçilir.

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  } // Seçili activity iptali ve 'selectedActivity' durumunu 'undefined' hale getirme

  function handleFormOpen(id?: string) {
    // id var mı? varsa activity vardır ve 'handleSelectActivity' işlevi çağrılır:
    id ? handleSelectActivity(id) : handleCancelSelectActivity(); // yoksa cancel edilir ve EditMode açılır:
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    }
  }

  function handleDeleteActivity(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter((x) => x.id !== id)]);
      setSubmitting(false);
    });
  }

  if (loading) return <LoadingComponent content='Loading app' />;

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
            editMode={editMode}
            openForm={handleFormOpen}
            closeForm={handleFormClose}
            createOrEdit={handleCreateOrEditActivity}
            deleteActivity={handleDeleteActivity}
            submitting={submitting}
          />
        </Container>
      </>
    </div>
  );
}
export default App;

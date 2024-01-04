import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/store';
import { Profile } from '../../models/profile';
import ProfilePhotos from './ProfilePhotos';
import ProfileFollowings from './ProfileFollowings';
import ProfileAbout from './ProfileAbout';
import { Tab } from 'semantic-ui-react';
import ProfileActivities from './ProfileActivities';

interface Props {
  profile: Profile;
}

export default observer(function ProfileContent({ profile }: Props) {
  const { profileStore } = useStore();
  const panes = [
    { menuItem: 'About', render: () => <ProfileAbout /> },
    { menuItem: 'Photos', render: () => <ProfilePhotos profile={profile} /> },
    { menuItem: 'Events', render: () => <ProfileActivities /> },
    { menuItem: 'Followers', render: () => <ProfileFollowings /> },
    { menuItem: 'Following', render: () => <ProfileFollowings /> },
  ];
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition='right'
      panes={panes}
      onTabChange={(_, data) =>
        profileStore.setActiveTab(data.activeIndex as number)
      }
    />
  );
});


import SideBarItem from "./components/SideBarItem";
export function Sidebar() {
  const itemsData = [
    {
      path: 'profile',
      label: 'My profile',
      // icon: <ProfileIcon size={50} color={EIconColor.RED} />
    },
    {
      path: 'messages',
      label: 'Messages',
    },
    {
      path: 'people',
      label: 'People',
      // icon: <PeopleIcon size={50} color={EIconColor.DARK} />
    },
    {
      path: 'feed',
      label: 'Feed',
      // icon: <FeedIcon size={50} color={EIconColor.DARK} />
    }
  ]
  return (
    <aside className="w-56 h-full p-1 pt-5 flex flex-col space-y-4">
      {itemsData.map((item) => (
        <SideBarItem key={item.path} path={item.path as 'profile' | 'people' | 'messages'} label={item.label} />
      ))}

    </aside>
  );
}

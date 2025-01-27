import Content from "../components/Contents/content";
import NavBar from "../components/Nav/nav";
import SideBar from "../components/Sidebar/sidebar";

function MainLayout() {
  return (
    <section id="main-layout">
      <NavBar />
      <SideBar />
      <Content />
    </section>
  );
}

export default MainLayout;

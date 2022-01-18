import { Button, Stack } from "@mui/material";
import { useState } from "react";
/* import "./App.css"; */

const sidebarIcons = ["home", "recycle", "coffee"];

function App() {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-content">navbar content</div>
      </nav>
      <div style={{ display: "flex" }}>
        <button
          id="burger-menu"
          onClick={() => setToggleSidebar(!toggleSidebar)}
          className={toggleSidebar ? "burger-menu-open" : "burger-menu-close"}
        >
          {toggleSidebar ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-arrow-bar-left"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5zM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              class="bi bi-arrow-bar-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5z"
              />
            </svg>
          )}
        </button>
        <div
          className={`sidebar ${
            toggleSidebar ? "sidebar-open" : "sidebar-close"
          }`}
        >
          <div className="sidebar-content">
            {/* {toggleSidebar &&
              sidebarIcons.map((icon) => <Icon name={icon} size="big" />)} */}
          </div>
        </div>

        <header
          className="App-header"
          style={{ marginLeft: 100, padding: "3em" }}
        >
          {/*  <Stack spacing={2} direction="row">
            <Button variant="text">Text</Button>
            <Button variant="contained">Contained</Button>
            <Button variant="outlined">Outlined</Button>
          </Stack>
          <Table basic celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Header</Table.HeaderCell>
                <Table.HeaderCell>Header</Table.HeaderCell>
                <Table.HeaderCell>Header</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Label ribbon>First</Label>
                </Table.Cell>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
              </Table.Row>
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="3">
                  <Menu floated="right" pagination>
                    <Menu.Item as="a" icon>
                      <Icon name="chevron left" />
                    </Menu.Item>
                    <Menu.Item as="a">1</Menu.Item>
                    <Menu.Item as="a">2</Menu.Item>
                    <Menu.Item as="a">3</Menu.Item>
                    <Menu.Item as="a">4</Menu.Item>
                    <Menu.Item as="a" icon>
                      <Icon name="chevron right" />
                    </Menu.Item>
                  </Menu>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table> */}
        </header>
      </div>
    </div>
  );
}

export default App;

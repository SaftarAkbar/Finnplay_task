import "../assets/css/userpanel.css";
import "../assets/css/modal.css";
import plus_bordered_icon from "../assets/icons/plus_bordered_icon.svg";
import edit_icon from "../assets/icons/edit_icon.svg";
import remove_icon from "../assets/icons/remove_icon.svg";
import example from "../assets/img/example.png";
import { providers } from "../../data.json";
import Button from "../ui/components/Button";
import Modal from "../ui/components/Modal";
import { useEffect, useState } from "react";
import Input from "../ui/components/Input";
import Select from "react-select";

const UserPanel = () => {
  const [groups, setGroups] = useState([]);
  const [games, setGames] = useState([]);
  const [groupModalVisible, setGroupModalVisible] = useState(false);
  const [groupPopupTitle, setGroupPopupTitle] = useState("Group delete");
  const [deletedGroupId, setDeletedGroupId] = useState(0);
  const [clickedGroup, setClickedGroup] = useState<any>(null);

  const [gamePopupTitle, setGamePopupTitle] = useState("Add game");
  const [gameModalVisible, setGameModalVisible] = useState(false);

  const [groupDeleteModalVisible, setGroupDeleteModalVisible] = useState(false);

  const [groupName, setGroupName] = useState("");

  const getAllGames = () => {
    fetch("http://localhost:5500/games")
      .then((res) => res.json())
      .then((res) => {
        setGames(res);
      });
  };

  const getAllGroups = () => {
    fetch("http://localhost:5500/game-groups")
      .then((res) => res.json())
      .then((res) => {
        setGroups(res);
      });
  };
  useEffect(() => {
    getAllGroups();
    getAllGames();
  }, []);

  const openGroupModal = (id?: number, body?: any) => {
    if (id) {
      // Update modal
      setClickedGroup(body);
      setGroupPopupTitle("Update group");
      setGroupModalVisible(true);
    } else {
      setClickedGroup(null);
      // Create modal
      setGroupPopupTitle("Create group");
      setGroupModalVisible(true);
    }
  };
  const openGameModal = (id?: number) => {
    if (id) {
      // Update modal
      setGameModalVisible(true);
    } else {
      // Create modal
      setGamePopupTitle("Add game");
      setGameModalVisible(true);
    }
  };
  const openDeleteGroupModal = (id: number) => {
    setDeletedGroupId(id);
    setGroupDeleteModalVisible(true);
  };
  const deleteGroupModal = () => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`http://localhost:5500/game-groups/${deletedGroupId}`, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        setGroups(res);
      });
    setGroupDeleteModalVisible(false);
  };
  const createOrUpdateGroup = () => {
    if (clickedGroup) {
      const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: groupName || clickedGroup.name }),
      };
      fetch(
        `http://localhost:5500/game-groups/${clickedGroup.id}`,
        requestOptions
      )
        .then((res) => res.json())
        .then((res) => {
          setGroupModalVisible(false);
          setGroups(res);
        });
    } else {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: groupName }),
      };
      fetch(`http://localhost:5500/game-groups/`, requestOptions)
        .then((res) => res.json())
        .then((res) => {
          setGroupModalVisible(false);
          setGroups(res);
        });
    }
  };

  const closeGroupModal = () => setGroupModalVisible(false);
  const closeGameModal = () => setGameModalVisible(false);
  const options = [
    { value: "420", label: "420" },
    { value: "Crusader Kings III", label: "Crusader Kings III" },
    { value: "Mighty Medusa", label: "Mighty Medusa" },
    { value: "Lava Lions", label: "Lava Lions" },
    { value: "Sea of Pearls", label: "Sea of Pearls" },
    { value: "Starburst Megaways", label: "Starburst Megaways" },
  ];

  const selectStyle = {
    multiValueLabel: (styles: any) => ({
      ...styles,
      backgroundColor: "#FDBC11",
    }),
    multiValueRemove: (styles: any) => ({
      ...styles,
      backgroundColor: "#FDBC11",
      ":hover": {
        color: "white",
      },
    }),
  };

  return (
    <div className="userpanel">
      <div className="userpanel__card card-groups">
        <Modal
          title={gamePopupTitle}
          isOpen={gameModalVisible}
          onClose={closeGameModal}
        >
          <div>
            <div>
              <Input
                name="username"
                value={"Slots"}
                type="text"
                label="Game name"
              />
              <br />
              <Select options={options} placeholder="Provider" />
              <br />
              <input type="file" name="file" placeholder="Add image" />
              <label className="custom-file-upload">
                <input type="file" />
                Add image
              </label>
              <br />
              <br />
            </div>
            <div className="modal-buttons">
              <Button
                btnStyle={{
                  background: "#FDBC11",
                  color: "black",
                  width: "12rem",
                  height: "4rem",
                }}
                title="Add"
              />
            </div>
          </div>
        </Modal>
        <Modal
          title={groupPopupTitle}
          isOpen={groupModalVisible}
          onClose={closeGroupModal}
        >
          <div>
            <div>
              <Input
                handleChange={(e) => setGroupName(e.target.value)}
                name="username"
                value={groupName}
                type="text"
                label="Group name"
              />
              <br />
              <Select styles={selectStyle} isMulti options={options} />
              <br />
            </div>
            <div className="modal-buttons">
              <Button
                onClick={() => createOrUpdateGroup()}
                btnStyle={{
                  background: "#FDBC11",
                  color: "black",
                  width: "12rem",
                  height: "4rem",
                }}
                title="Save"
              />
            </div>
          </div>
        </Modal>
        <Modal
          title="Group delete"
          isOpen={groupDeleteModalVisible}
          onClose={() => setGroupDeleteModalVisible(false)}
        >
          <div>
            <div>
              <p>Do you want to delete Slots group?</p>
              <p>All 63 games will be moved to selected group.</p>
              <br />
              <Select options={options} placeholder="Move games to" />
              <br />
            </div>
            <div className="modal-buttons">
              <Button
                onClick={() => deleteGroupModal()}
                btnStyle={{
                  background: "#EC4466",
                  color: "white",
                  width: "12rem",
                  height: "4rem",
                }}
                title="Yes, delete"
              />
              <Button
                onClick={() => setGroupDeleteModalVisible(false)}
                btnStyle={{
                  background: "#6C6963",
                  color: "white",
                  width: "12rem",
                  height: "4rem",
                }}
                title="No"
              />
            </div>
          </div>
        </Modal>

        <div className="userpanel__card__head">
          <p>Groups</p>
          <img
            onClick={() => openGroupModal()}
            src={plus_bordered_icon}
            alt="plus_bordered_icon"
          />
        </div>
        <div className="userpanel__card__body">
          {groups.map((g: any) => {
            return (
              <div className="userpanel__card__body__item" key={g.id}>
                <img src={example} alt={g.name} />
                <div>{g.name}</div>
                <div className="userpanel__card__body__item--actions">
                  <Button
                    onClick={() => openGroupModal(g.id, g)}
                    btnStyle={{ minWidth: "max-content" }}
                    startIcon={edit_icon}
                    className="btn-no-color"
                    title="Edit"
                  />
                  <Button
                    onClick={() => openDeleteGroupModal(g.id)}
                    startIcon={remove_icon}
                    className="btn-no-color"
                    title="Delete"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="userpanel__card card-games">
        <div className="userpanel__card__head">
          <p>Games</p>
          <img
            onClick={() => openGameModal()}
            src={plus_bordered_icon}
            alt="plus_bordered_icon"
          />
        </div>
        <div className="userpanel__card__body">
          {games.map((g: any) => {
            return (
              <div className="userpanel__card__body__item" key={g.id}>
                <img src={g.cover} alt={g.name} />
                <div>{g.name}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="userpanel__card card-providers">
        <div className="userpanel__card__head">
          <p>Providers</p>
        </div>
        <div className="userpanel__card__body">
          {providers.map((g) => {
            return (
              <div className="userpanel__card__body__item" key={g.id}>
                <div className="logo_card">
                  <img src={g.logo} alt={g.name} />
                </div>
                <div>{g.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserPanel;

import React from "react";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import CustomChekbox from "../../partials/CustomCheckbox";
import Notification from "../../partials/Notification";
import LeftBar from "../../partials/attendee-leftbar";
import EventsTab from "../../partials/attendee-events-tab";
import { defaultEventsCompleted } from "../../partials/helpers/helpers";
import { useEffect } from "react";

const EventsJoined = () => {
  const [events, setEvents] = useState([
    {
      title: "Storytime in Scilla",
      img: "completed",
      time: "May 4 - 11:00 AM",
      participants: 19,
      participantsImg: ["Host-1", "Host-2", "Host-3"],
      reviewed: false,
    },
    {
      title: "Stay-In-Home Photography Lesson",
      img: "completed-1",
      time: "May 5 - 5:00 PM",
      participants: 18,
      participantsImg: ["Host-1", "Host-2", "Host-3"],
      reviewed: true,
    },
  ]);

  const [search, setSearch] = useState("");

  const [searchEvents, setSearchEvents] = useState(false);

  const openSearch = () => {
    setSearchEvents(true);
  };

  const closeSearch = () => {
    setSearchEvents(false);
    setSearch("");
    setEvents(defaultEventsCompleted);
  };

  useEffect(() => {
    const newEvents = defaultEventsCompleted.filter((ev) =>
      ev.title.toLowerCase().includes(search.toLowerCase())
    );

    setEvents(newEvents);
  }, [search]);

  return (
    <div className="app-height d-flex align-items-start p-24 attendee-dashboard">
      <LeftBar />
      <div className="attendee-right-content">
        <div className="d-flex justify-content-between align-items-center">
          <div></div>
          <img src="/images/Logo@3x.png" className="max-155" />
          <div className="position-relative">
            {!searchEvents ? (
              <img
                src="/images/Search@3x.png"
                className="max-32 c-pointer"
                onClick={openSearch}
              />
            ) : (
              <img
                src="/images/close-search@3x.png"
                className="max-32 c-pointer"
                onClick={closeSearch}
              />
            )}
          </div>
        </div>
        <div className="mt-44">
          {!searchEvents ? (
            <div className="d-flex justify-content-between align-items-center mb-12">
              <div></div>
              <EventsTab />
              <div>
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic">
                    <span className="f-24">
                      <i className="fas fa-bars drop-icon" tabIndex="1"></i>
                    </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <div className="d-item">
                      <p className="f-16 fw-500">Popular Events</p>
                      <CustomChekbox />
                    </div>
                    <div className="d-item">
                      <p className="f-16 fw-500">Hot Events</p>
                      <CustomChekbox />
                    </div>
                    <div className="d-item">
                      <p className="f-16 fw-500">Events starts today</p>
                      <CustomChekbox />
                    </div>
                    <div className="d-item mb-0">
                      <p className="f-16 fw-500">Events starts in 1 hour</p>
                      <CustomChekbox />
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          ) : (
            <div className="max-350 ml-auto mr-auto">
              <input
                type="search"
                placeholder="Type here to search events"
                className="app-input search mb-0"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          )}
          <div className="events-list flex-1 mt-60">
            {events.map((e, i) => {
              const {
                title,
                img,
                time,
                type,
                participantsImg,
                participants,
                reviewed,
              } = e;
              return (
                <div key={i} className="mb-36">
                  <div className="position-relative">
                    <img src={`/images/${img}@3x.png`} alt={img} />
                    <div className="img-bottom-content">
                      {participantsImg ? (
                        <div className="participantsImg">
                          {participantsImg.map((p, index) => {
                            return (
                              <img
                                src={`/images/${p}@3x.png`}
                                alt={img}
                                className={`br-${type}`}
                                key={index}
                              />
                            );
                          })}
                        </div>
                      ) : null}
                      {participants > 0 ? (
                        <p className="f-14 fw-300 mb-0">
                          +{participants} participants
                        </p>
                      ) : (
                        <p className="f-14 fw-300 mb-0">
                          Be the first to join!
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="f-18 mt-3 mb-2 fw-300">{title}</p>
                  <p className="text-gray f-14">{time}</p>
                  {!reviewed ? (
                    <button className="btn-teal w-100 fw-500">
                      Review Event
                    </button>
                  ) : (
                    <p className="text-gray f-14">
                      * You have reviewed this event
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          {events.length == 0 && searchEvents == true ? (
            <div className="empty-search text-center">
              <img
                src="/images/broke-ticket@3x.png"
                alt="empty-search"
                className="max-207 mb-36"
              />
              <p className="f-24 fw-300 mb-12">No results found</p>
              <p className="f-16 fw-300">
                Please make sure if you enter the correct keyword.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default EventsJoined;

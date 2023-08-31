import React, { useContext, useEffect, useReducer, useState } from "react";

import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import SpeakerDetail from '../components/SpeakerDetail';
import speakerData from "../data/SpeakerData";
import { ConfigContext } from "./_app";



const SpeakersPage = ({ }) => {
  const [speakingSaturday, setSpeakingSaturday] = useState(true);
  const [speakingSunday, setSpeakingSunday] = useState(true);

  // const [speakerList, setSpeakerList] = useState([]);
  const [speakerList, setSpeakerList] = useReducer((state, action) => action, []);  
  const [isLoading, setIsLoading] = useState(true);

  const context = useContext(ConfigContext);

  // const speakersReducer(state, action) {
  //   return action
  // }


  useEffect(() => {
    setIsLoading(false)
    new Promise((resolve) => {
      setTimeout(() => resolve(), 1000);
    }).then(() => {
      setSpeakerList(speakerData)
      setIsLoading(false)
    })

    return () => {
      console.log('CleanUp')
    }
  }, [])

  const handleChangeSaturday = () => {
    setSpeakingSaturday(!speakingSaturday);
  };

  const handleChangeSunday = () => {
    setSpeakingSunday(!speakingSunday);
  };

  const speakerListFiltered = isLoading
    ? []
    : speakerList.filter(
      ({ sat, sun }) =>
        (speakingSaturday && sat) || (speakingSunday && sun),
    )
      .sort(function (a, b) {
        if (a.firstName < b.firstName) {
          return -1;
        }
        if (a.firstName > b.firstName) {
          return 1;
        }
        return 0;
      });


  const heartFavoriteHandler = (e, favoriteValue) => {
    e.preventDefault();
    const sessionId = parseInt(e.target.attributes['data-sessionid'].value);
    setSpeakerList(
      speakerList.map((item) => {
        if (item.id === sessionId) {
          return { ...item, favorite: favoriteValue };
        }
        return item;
      }),
    );
  };

  if (isLoading) return <div>Loading...</div>

  return (
    <>
      <Header />
      <Menu />
      <div className="container">
        <div className="btn-toolbar margintopbottom5 chekbox-bigger">
          {context.showSpeakerSpeakingDays === false ? null : (
          <div className="hide">
            <div className="form-check-inline">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  className="form-check-input"
                  onChange={handleChangeSaturday}
                  checked={speakingSaturday}
                />
                Saturday Speakers
              </label>
            </div>
            <div className="form-check-inline">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  className="form-check-input"
                  onChange={handleChangeSunday}
                  checked={speakingSunday}
                />
                Sunday Speakers
              </label>
            </div>
          </div>
          )}
        </div>
        <div className="row">
          <div className="card-deck">
            {speakerListFiltered.map(
              ({ id, firstName, lastName, bio, favorite }) => {
                return (
                  <SpeakerDetail
                    key={id}
                    id={id}
                    favorite={favorite}
                    firstName={firstName}
                    lastName={lastName}
                    bio={bio}
                    onHeartFavoriteHandler={heartFavoriteHandler}
                  />
                );
              },
            )}
          </div>
        </div>
      </div>
    </>
  )
};



export default SpeakersPage;

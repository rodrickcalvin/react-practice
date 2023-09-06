import React, { useCallback, useContext, useEffect, useReducer, useState } from "react";

import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import SpeakerDetail from '../components/SpeakerDetail';
import speakerData from "../data/SpeakerData";
import { ConfigContext } from "./_app";



const SpeakersPage = ({ }) => {
  const [speakingSaturday, setSpeakingSaturday] = useState(true);
  const [speakingSunday, setSpeakingSunday] = useState(true);

  const speakersReducer = (state, action) => {
    const updateFavorite = (favoriteValue) => {
      return state.map((item, index) => {
        if (item.id === action.sessionId) {
          item.favorite = favoriteValue;
          return item;
        }
        return item;
      })
    }

    switch (action.type) {
      case 'setSpeakerList': {
        return action.data
      }
      case 'favorite': {
        return updateFavorite(true)
      }
      case 'unfavorite': {
        return updateFavorite(false)
      }
      default:
        return state
    }
  }


  // const [speakerList, setSpeakerList] = useState([]);
  const [speakerList, dispatch] = useReducer(speakersReducer, []);  
  const [isLoading, setIsLoading] = useState(true);

  const context = useContext(ConfigContext);


  useEffect(() => {
    setIsLoading(false)
    new Promise((resolve) => {
      setTimeout(() => resolve(), 1000);
    }).then(() => {
      // setSpeakerList(speakerData)
      const speakerListServerFilter = speakerData.filter(({ sat, sun }) => {
        return (speakingSaturday && sat) || (speakingSunday && sun);
      })
      setIsLoading(false)

      dispatch({
        type: 'setSpeakerList',
        data: speakerListServerFilter
      }) // force rerender
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


  const heartFavoriteHandler = useCallback((e, favoriteValue) => {
    e.preventDefault();
    const sessionId = parseInt(e.target.attributes['data-sessionid'].value);

    dispatch ({
      type: favoriteValue === true ? 'favorite' : 'unfavorite',
      sessionId
    })
    // setSpeakerList(
    //   speakerList.map((item) => {
    //     if (item.id === sessionId) {
    //       return { ...item, favorite: favoriteValue };
    //     }
    //     return item;
    //   }),
    // );
  }, []);

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

import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPinsByBoardId = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
    .then((result) => {
      const allPinsObj = result.data;
      const boardPins = [];
      if (allPinsObj != null) {
        Object.keys(allPinsObj).forEach((pinId) => {
          const newPin = allPinsObj[pinId];
          newPin.id = pinId;
          boardPins.push(newPin);
        });
      }
      resolve(boardPins);
    })
    .catch((err) => reject(err));
});

export default { getPinsByBoardId };

import {
    LOAD_QUESTION,
    UPDATE_QUESTION,
    REMOVE_QUESTION
  } from "../definitions/questions";
  
  const initialState = [];
  
  const questionsReducer = (state = initialState, action) => {
      const {
          type,
          payload
      } = action;
      switch (type) {
          case(LOAD_QUESTION):
              return [payload, ...state]
          case(REMOVE_QUESTION):
              return state.filter(question=>{
                  if(question._id !== payload){
                      return question;
                  }
              });
          case UPDATE_QUESTION:
              return state.map(question=>{
                  if(question._id !== payload._id){
                      return question;
                  }
                  else{
                      return payload
                  }
              });
          default:
              return state
      }
  
  }
  
  export default questionsReducer;
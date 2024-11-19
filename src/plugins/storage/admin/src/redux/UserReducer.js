    // UserReducer.js
    
    const defaultState = {
        data: null
    };
      
      /**
       * This is a reducer, a pure function with (state, action) => state signature.
       * It describes how an action transforms the state into the next state.
       *
       * The shape of the state is up to you: it can be a primitive, an array, an object,
       * or even an Immutable.js data structure. The only important part is that you should
       * not mutate the state object, but return a new object if the state changes.
       *
       * In this example, we use a `switch` statement and strings, but you can use a helper that
       * follows a different convention (such as function maps) if it makes sense for your
       * project.
       */
      const UserReducer = (state = defaultState, action) => {
        switch (action.type) {
          case 'DATA_SAVE': {
            return {
              ...state,
              ...{data: action.payload},
            };
          }
      
          case 'DATA_DELETE': {
            return defaultState;
          }
          
          case 'SET_CHECK': {
            console.log(action);
            
            const {collIndex, checked} = action.payload
            if(state.data && state.data.length) {
                const data = [...state.data]
                console.log(data);
                
                
                data[collIndex].visible = checked;
                return{
                    ...state,
                    ...{data: [...data]}
                }
            }
          }
      
          default:
            return defaultState;
        }
      };
      
      export default UserReducer;
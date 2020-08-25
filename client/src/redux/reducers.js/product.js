const initState = {
    products : [],
    product: null,
    loading: true,
    error: {}
}
export default function(state = initState, action){
    const {type, payload } = action
    switch (type) {
        case 'ADD_PRODUCT':
          return {
              ...state,
              products: [payload, ...state.products],
              loading: false
          };
          case 'GET_PRODUCTS': 
              return {
                  ...state,
                  products: payload,
                  loading: false
              }
           case 'GET_PRODUCT':
               return {
                  ...state,
                  product: payload,
                  loading: false
               } ;
             case 'DELETE_PRODUCT':
                 return {
                  ...state,
                  products: state.products.filter(product => product._id !== payload),
                  loading: false
                 }


            case 'ADD_COMMENT': 
            return {
                ...state,
                product: {...state.product, comments: payload},
                loading: false
            }  
            case 'UPDATE_LIKES':
                return {
                    ...state,
                    product:{...state.product,  likes: payload.likes} ,
                    loading: false 
                     }
        default:
            return state
    }
}
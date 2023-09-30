import {createSlice} from '@reduxjs/toolkit'




export const productReducer = createSlice({
    name:'products',
    initialState:{products:[]},
    reducers:{
        set_products:(state,action)=>{
            return {products:action.payload};
        },
        add_product:(state,action) => {
            return{
                products:[action.payload,...state.products]
            }
        },
        delete_product:(state,action) => {
            let updatedProducts = state.products.filter((eproduct=>
                eproduct.id != action.payload.id));
            return{
                products: updatedProducts,
            }
        },
        edit_product:(state,action) => {
            const updatedProduct = state.products.map((eproduct=>
                eproduct.id == action.payload.id?
                {...eproduct,...action.payload}:eproduct));
            return{
                products: updatedProduct,
            }
        }
    }
});

export default productReducer.reducer;
export const {set_products,add_product,delete_product,edit_product} = productReducer.actions;
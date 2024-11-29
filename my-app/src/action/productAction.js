import axios from 'axios';

const url = 'http://localhost:3005/api/products';

export const fetchProducts = () => async (dispatch) => {
  dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });
  try {
    const response = await axios.get(url);
    dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: error.message });
  }
};

export const searchByCategoriesProducts = (category) => async (dispatch) => {
  dispatch({ type: 'FILTER_PRODUCTS_CATEGORY_REQUEST' });
  try {
    const response = await axios.get(`${url}/category/${category}`);
    dispatch({ type: 'FILTER_PRODUCTS_CATEGORY_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FILTER_PRODUCTS_CATEGORY_FAILURE', payload: error.message });
  }
};

export const getProductById = (id) => async (dispatch) => {
  dispatch({ type: 'GET_PRODUCT_BY_ID_REQUEST' });
  try {
    const response = await axios.get(`${url}/${id}`);
    dispatch({ type: 'GET_PRODUCT_BY_ID_SUCCESS', payload: response.data });
    
  } catch (error) {
    dispatch({ type: 'GET_PRODUCT_BY_ID_FAILURE', payload: error.message });
  }
};

export const createProduct = (product) => async (dispatch) => {
  dispatch({ type: 'CREATE_PRODUCT_REQUEST' });
  try {
    const response = await axios.post(`${url}/create`, product);
    dispatch({ type: 'CREATE_PRODUCT_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'CREATE_PRODUCT_FAILURE', payload: error.message });
  }
};

export const updateProduct = (product) => async (dispatch) => {
  dispatch({ type: 'UPDATE_PRODUCT_REQUEST' });
  try {
    const response = await axios.put(`${url}/update/${product.id}`, product);
    dispatch({ type: 'UPDATE_PRODUCT_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'UPDATE_PRODUCT_FAILURE', payload: error.message });
  }
};


export const deleteProduct = (id) => async (dispatch) => {
  dispatch({ type: 'DELETE_PRODUCT_REQUEST' });
  try {
    await axios.delete(`${url}/delete/${id}`);
    dispatch({ type: 'DELETE_PRODUCT_SUCCESS', payload: id });
  } catch (error) {
    dispatch({ type: 'DELETE_PRODUCT_FAILURE', payload: error.message });
  }
};

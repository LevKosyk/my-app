import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/index';

interface Product {
    id: number;
    name: string;
    category: string;
    description: string;
    price: number;
}

interface ProductState {
    items: Product[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    product: Product
}

const initialState: ProductState = {
    items: [],
    status: 'idle',
    error: null,
    product: {name: '', description: '', price: 0, category: '', id: 0},
};

export const fetchProducts = createAsyncThunk('/products', async () => {
    const response = await api.get('/');
    return response.data as Product[];
});


export const createProduct = createAsyncThunk('/create', async (product: Product) => {
    const response = await api.post('/create', product); 
    return response.data as Product;
});

export const updateProduct = createAsyncThunk<Product, Product>('/updateProduct/:id', async (product) => {
    const response = await api.put(`/update/${product.id}`, product);
    return response.data as Product;
});

export const deleteProduct = createAsyncThunk<number, number>('/delete/:id', async (id) => {
    await api.delete(`/delete/${id}`);
    return id; 
});

export const getProductById = createAsyncThunk<Product, number>('/:id', async (id) => {
    const response = await api.get(`/${id}`);
    return response.data as Product;
});

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch products';
            })
            .addCase(createProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = [...state.items, action.payload];
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to create product';
            })
            .addCase(updateProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = state.items.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                );
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to update product';
            })
            .addCase(deleteProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = state.items.filter((item) => item.id !== action.payload);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to delete product';
            })
            .addCase(getProductById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.product = action.payload;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch product';
            });
    },
});

export default productsSlice.reducer;

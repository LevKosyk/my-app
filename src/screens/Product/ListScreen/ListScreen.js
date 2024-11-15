import { useState, useEffect } from "react";
import Navbar from '../../../components/Navbar/Navbar';
import CreateScreen from '../CreateScreen/CreateScreen';

const ListScreen = () => {
    const [products, setProducts] = useState([
        { id: 1, name: "Product 1", price: 10, description: "Description for Product 1" },
        { id: 2, name: "Product 2", price: 20, description: "Description for Product 2" },
        { id: 3, name: "Product 3", price: 30, description: "Description for Product 3" },
        { id: 4, name: "Product 4", price: 40, description: "Description for Product 4" },
    ]);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [error, setError] = useState(null);

    const handleUpdate = (id) => {
        const product = products.find(item => item.id === id);
        setCurrentProduct(product);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentProduct) {
            const updatedProducts = products.map((item) =>
                item.id === currentProduct.id ? currentProduct : item
            );
            setProducts(updatedProducts);
            setCurrentProduct(null); 
        }
    };

    const addProduct = (product) => {
        product.id = products.length +1;
        setProducts([...products, product]);
    };
    
    const deleteProduct = (id) => {
        setProducts(products.filter(item => item.id !== id));
    };

    const renderProducts = () => (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Update Product</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={currentProduct?.name || ''}
                                        onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message-text" className="col-form-label">Description:</label>
                                    <input
                                        className="form-control"
                                        value={currentProduct?.description || ''}
                                        onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message-text" className="col-form-label">Price:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={currentProduct?.price || ''}
                                        onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <CreateScreen addProduct={addProduct} />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Description</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item) => (
                        <tr key={item.id}>
                            <th scope="row">{item.id}</th>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.description}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => deleteProduct(item.id)}>Delete</button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    onClick={() => setCurrentProduct(item)}
                                >
                                    Update
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div>
            <Navbar />
            {error && <div>{error}</div>}
            {renderProducts()}
        </div>
    );
};

export default ListScreen;

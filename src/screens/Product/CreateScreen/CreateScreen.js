import { useState } from "react";

const CreateScreen = ({ addProduct }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Валидация данных
        const parsedPrice = parseFloat(price);
        if (!name.trim()) {
            setError("Name is required");
            return;
        }
        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            setError("Price must be a positive number");
            return;
        }
        if (!description.trim()) {
            setError("Description is required");
            return;
        }
        setError('');
        try {
            const newProduct = {
                name,
                price: parsedPrice,
                description,
            };
            addProduct(newProduct);
            setName('');
            setPrice('');
            setDescription('');
        } catch (err) {
            setError("Failed to add product. Please try again.");
        }
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Create New Product</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Product Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter product name"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="price"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="Enter product price"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        rows="4"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Enter product description"
                                    />
                                </div>

                                {error && <div className="alert alert-danger">{error}</div>}

                                <div className="d-flex justify-content-between">
                                    <button type="submit" className="btn btn-success">Create Product</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateScreen;

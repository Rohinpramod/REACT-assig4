import React,{useState,useEffect} from 'react';
import { Button } from 'react-bootstrap';
function Main() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [items, setItems] = useState([]);

    useEffect(() => {
        const savedItems = JSON.parse(localStorage.getItem('items')) || [];
        setItems(savedItems);
    }, []);

    const validate = () => {
        let errors = {};
        if (!name) errors.name = "Name is required";
        if (!email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email is invalid";
        }
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            const newItem = { name, email };
            const updatedItems = [...items, newItem];
            
            setItems(updatedItems);
            localStorage.setItem('items', JSON.stringify(updatedItems));
            
            setErrors({});
            setName('');
            setEmail('');
            alert('Data saved successfully!');
        }
    };
    const handleDelete = (index)=> { 
        const updatedItems = items.filter((_, i)=> i !== index);
        setItems(updatedItems);
        localStorage.setItem('items',JSON.stringify(updatedItems));
    };

  return (
    <div className='container m-auto '>
       
        <form className='form mt-5' onSubmit={handleSubmit}>
        <h2>Add Contact</h2>
        <div className="mb-3 ">
            <label htmlFor="exampleInputName" className="form-label">
            Name
            </label>
            <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            id="name"
            />
            {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail" className="form-label">
            Email
            </label>
            <input
             type="email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="email"
            />
             {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>
        <button type="submit" className="btn btn-primary ps-4 px-4 ">
            Add
        </button>
        </form>
        <ul>
            {items.map((item, index) => (
                <li key={index}>
                    {item.name} - {item.email}
                    <Button className='ms-2' variant="danger" onClick={()=> handleDelete(index)}>Delete</Button>
                    
                </li>
            ))}
        </ul>
       
    </div>
  );
}

export default Main

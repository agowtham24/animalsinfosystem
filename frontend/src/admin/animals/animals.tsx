import "./animals.css";
import { Header } from "../header/header";
import { api, config } from "../../utils/apiconfig";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";

export function Animals() {
  const addForm = useForm();
  const editForm = useForm();
  const [animals, setAnimals] = useState([] as any[]);
  const [editData, setEditData] = useState({} as any);
  const [editMode, setEditMode] = useState(false);
  const fetchAnimals = async () => {
    try {
      const res = await api.get(`animals`);
      console.log(res.data, "res");
      setAnimals(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAnimals();
  }, []);
  return (
    <>
      <Header />
      <div className="container">
        <div
          className="card"
          style={{
            marginTop: "70px",
          }}
        >
          <div className="card-body">
            {editMode === false && <div className="h5">Create Animal</div>}
            {editMode === true && <div className="h5">Edit Animal</div>}
            <form>
              {editMode === false && (
                <div className="row">
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <label htmlFor="name" className="form-label">
                      Name <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      {...addForm.register("name", {
                        required: "Name Required",
                      })}
                    />
                    {addForm.formState.errors.name && (
                      <span className="text-danger">
                        {addForm.formState.errors.name.message?.toString()}
                      </span>
                    )}
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <label htmlFor="image" className="form-label">
                      Image <span>*</span>
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      {...addForm.register("image", {
                        required: "Image Required",
                      })}
                    />
                    {addForm.formState.errors.image && (
                      <span className="text-danger">
                        {addForm.formState.errors.image.message?.toString()}
                      </span>
                    )}
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <label htmlFor="details" className="form-label">
                      Details <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      {...addForm.register("details", {
                        required: "Details Required",
                      })}
                    />
                    {addForm.formState.errors.details && (
                      <span className="text-danger">
                        {addForm.formState.errors.details.message?.toString()}
                      </span>
                    )}
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <label htmlFor="location" className="form-label">
                      Location <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      {...addForm.register("location", {
                        required: "Location Required",
                      })}
                    />
                    {addForm.formState.errors.location && (
                      <span className="text-danger">
                        {addForm.formState.errors.location.message?.toString()}
                      </span>
                    )}
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <label htmlFor="foods" className="form-label">
                      Foods <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      {...addForm.register("foods", {
                        required: "Foods Required",
                      })}
                    />
                    {addForm.formState.errors.foods && (
                      <span className="text-danger">
                        {addForm.formState.errors.foods.message?.toString()}
                      </span>
                    )}
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <label htmlFor="description" className="form-label">
                      Description <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      {...addForm.register("description", {
                        required: "Description Required",
                      })}
                    />
                    {addForm.formState.errors.description && (
                      <span className="text-danger">
                        {addForm.formState.errors.description.message?.toString()}
                      </span>
                    )}
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <button
                      className="btn btn-primary mt-4"
                      onClick={addForm.handleSubmit(async (data) => {
                        try {
                          const formData = new FormData();
                          formData.append("name", data.name);
                          formData.append("image", data.image[0]);
                          formData.append("details", data.details);
                          formData.append("location", data.location);
                          formData.append("foods", data.foods);
                          formData.append("description", data.description);

                          const res = await api.post(`animals`, formData);
                          console.log(res.data, "res");
                          fetchAnimals();
                          toast.success("Animal Created");
                        } catch (error) {
                          console.log(error);
                        }
                      })}
                    >
                      Create
                    </button>
                  </div>
                </div>
              )}
              {editMode === true && (
                <div className="row">
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <label htmlFor="name" className="form-label">
                      Name <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                   
                      {...editForm.register("name", {
                        required: "Name Required",
                      })}
                    />
                    {editForm.formState.errors.name && (
                      <span className="text-danger">
                        {editForm.formState.errors.name.message?.toString()}
                      </span>
                    )}
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <label htmlFor="image" className="form-label">
                      Image <span>*</span>
                    </label>
                    <input
                      type="file"
                      className="form-control"
                    
                      {...editForm.register("image")}
                    />
                    {editForm.formState.errors.image && (
                      <span className="text-danger">
                        {editForm.formState.errors.image.message?.toString()}
                      </span>
                    )}
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <label htmlFor="details" className="form-label">
                      Details <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                  
                      {...editForm.register("details", {
                        required: "Details Required",
                      })}
                    />
                    {editForm.formState.errors.details && (
                      <span className="text-danger">
                        {editForm.formState.errors.details.message?.toString()}
                      </span>
                    )}
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <label htmlFor="location" className="form-label">
                      Location <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                    
                      {...editForm.register("location", {
                        required: "Location Required",
                      })}
                    />
                    {editForm.formState.errors.location && (
                      <span className="text-danger">
                        {editForm.formState.errors.location.message?.toString()}
                      </span>
                    )}
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <label htmlFor="foods" className="form-label">
                      Foods <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                    
                      {...editForm.register("foods", {
                        required: "Foods Required",
                      })}
                    />
                    {editForm.formState.errors.foods && (
                      <span className="text-danger">
                        {editForm.formState.errors.foods.message?.toString()}
                      </span>
                    )}
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <label htmlFor="description" className="form-label">
                      Description <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                    
                      {...editForm.register("description", {
                        required: "Description Required",
                      })}
                    />
                    {editForm.formState.errors.description && (
                      <span className="text-danger">
                        {editForm.formState.errors.description.message?.toString()}
                      </span>
                    )}
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <button
                      className="btn btn-primary mt-4"
                      onClick={editForm.handleSubmit(async (data) => {
                        try {
                          const formData = new FormData();
                          formData.append("name", data.name);
                          if (data.image[0]) {
                            formData.append("image", data.image[0]);
                          }
                          formData.append("details", data.details);
                          formData.append("location", data.location);
                          formData.append("foods", data.foods);
                          formData.append("description", data.description);
                          const res = await api.patch(
                            `animals/${editData._id}`,
                            formData
                          );
                          console.log(res.data, "res");
                          fetchAnimals();
                          toast.success("Animal Updated");
                          setEditMode(false);
                        } catch (error) {
                          console.log(error);
                        }
                      })}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger mt-4"
                      onClick={() => {
                        setEditMode(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="card mt-3">
          <div className="card-body">
            <div className="h5">Animals List</div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>S.no</th>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Details</th>
                  <th>Location</th>
                  <th>Foods</th>
                  <th>Description</th>
                  <th>Likes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {animals.map((animal, index) => (
                  <tr key={animal._id}>
                    <td>{index + 1}</td>
                    <td>{animal.name}</td>
                    <td>
                      <img
                        src={config.animals + animal.image}
                        alt="pic"
                        style={{
                          height: "200px",
                          width: "200px",
                        }}
                      />
                    </td>
                    <td>{animal.details}</td>
                    <td>{animal.location}</td>
                    <td>{animal.foods}</td>
                    <td>{animal.description}</td>
                    <td>{animal.likes}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          setEditMode(true);
                          setEditData(animal);
                          editForm.setValue("name",animal.name)
                          editForm.setValue("details",animal.details)
                          editForm.setValue("location",animal.location)
                          editForm.setValue("foods",animal.foods)
                          editForm.setValue("description",animal.description)
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger ms-2"
                        onClick={async () => {
                          try {
                            const res = await api.delete(
                              `animals/${animal._id}`
                            );
                            console.log(res.data, "res");
                            fetchAnimals();
                            toast.success("Animal Deleted");
                          } catch (error) {
                            console.log(error);
                          }
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}

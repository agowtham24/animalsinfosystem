import "./animals.css";
import { Header } from "../header/header";
import { api } from "../../utils/apiconfig";
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
                    
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12"></div>
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12"></div>
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12"></div>
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12"></div>
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12"></div>
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12"></div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}

import "./home.css";
import { Header } from "../header/header";
import { api, config } from "../../utils/apiconfig";
import { useState, useEffect,useRef } from "react";
import { Toaster, toast } from "react-hot-toast";
export function Home() {
  const comment = useRef<HTMLTextAreaElement>(null);
  const [reviews, setReviews] = useState([] as any[]);
  const [rating, setRating] = useState(0);
  const [animals, setAnimals] = useState([] as any[]);
  const [selectedAnimal, setSelectedAnimal] = useState("");
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
  const setReview = (rating: number, index: number) => {
    setRating(rating);
    const icons = document.querySelectorAll(".icon");
    icons[index].classList.add("activee");
    for (let i = 0; i < icons.length; i++) {
      if (i !== index) {
        icons[i].classList.remove("activee");
      }
    }
  };
  return (
    <>
      <Header />
      <div className="container">
        <div
          style={{
            marginTop: "70px",
          }}
        >
          <div className="row">
            <div className="h5 text-center">Animals List</div>
            {animals.map((animal) => (
              <div
                className="col-lg-6 col-md-6 col-sm-6 col-12"
                key={animal._id}
              >
                <div className="card">
                  <div className="card-body text-center">
                    <img
                      src={config.animals + animal.image}
                      alt="pic"
                      style={{
                        height: "200px",
                      }}
                    />
                    <div>
                      <span className="h5">Name : </span>
                      <span>{animal.name}</span>
                    </div>
                    <div>
                      <span className="h5">location : </span>
                      <span>{animal.location}</span>
                    </div>
                    <div>
                      <span className="h5 mt-2">Details </span>
                    </div>
                    <div>
                      <span>{animal.details}</span>
                    </div>
                    <div>
                      <span className="h5 mt-2">foods </span>
                    </div>
                    <div>
                      <span>{animal.foods}</span>
                    </div>
                    <div>
                      <span className="h5 mt-2">Description </span>
                    </div>
                    <div>
                      <span>{animal.description}</span>
                    </div>
                    <div>
                      <i
                        className="fa-solid fa-thumbs-up"
                        onClick={async () => {
                          try {
                            await api.patch(`animals/${animal._id}`, {
                              likes: Number(animal.likes) + 1,
                            });
                            toast.success("Liked");
                            fetchAnimals();
                          } catch (error) {
                            toast.error("Somthing went wrong");
                          }
                        }}
                      ></i>
                    </div>
                    <div> {animal.likes}</div>
                    <div className="row mt-5">
                      <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        <button
                          className="btn btn-sm btn-secondary"
                          data-bs-toggle="modal"
                          data-bs-target="#reviewModal"
                          onClick={() => {
                            setSelectedAnimal(animal._id);
                          }}
                        >
                          Review Service
                        </button>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        <button
                          className="btn btn-sm btn-secondary"
                          data-bs-toggle="modal"
                          data-bs-target="#reviewListModal"
                          onClick={async () => {
                            try {
                              const res = await api.get(
                                `reviews/${animal._id}`
                              );
                              console.log(res.data,"reviews")
                              setReviews(res.data);
                            } catch (error) {
                              console.log(error);
                            }
                          }}
                        >
                          View Reviews
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className="modal"
        id="reviewListModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="h6" id="exampleModalLabel">
                Reviews
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {reviews.map((review, index) => {
                return (
                  <div key={index}>
                    <div>{review.user[0]?.name}</div>
                    {Array.from({ length: review.rating }).map((_, index) => (
                      <span key={index}>
                        <i
                          className="fa-solid fa-star"
                          style={{
                            color: "#dda80ab3",
                          }}
                        ></i>
                      </span>
                    ))}

                    <div>Comment : {review.comment}</div>
                    <hr />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal"
        id="reviewModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="h6" id="exampleModalLabel">
                Hey, Write your review here
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  const myModal = document.getElementById(
                    "reviewModal"
                  ) as HTMLElement;
                  myModal.style.display = "none";
                  myModal.classList.remove("show");
                }}
              ></button>
            </div>
            <div className="modal-body review">
              <div className="row justify-content-evenly">
                <div className="col-2">
                  <i
                    className="fa-solid fa-face-angry icon"
                    onClick={() => setReview(1, 0)}
                  ></i>
                  <div className="h6 mt-1">poor</div>
                </div>
                <div className="col-2">
                  <i
                    className="fa-solid fa-face-frown icon"
                    onClick={() => setReview(2, 1)}
                  ></i>
                  <div className="h6 mt-1">bad</div>
                </div>
                <div className="col-2">
                  <i
                    className="fa-solid fa-face-meh icon"
                    onClick={() => setReview(3, 2)}
                  ></i>
                  <div className="h6 mt-1">average</div>
                </div>
                <div className="col-2">
                  <i
                    className="fa-solid fa-face-grin icon"
                    onClick={() => setReview(4, 3)}
                  ></i>
                  <div className="h6 mt-1">good</div>
                </div>
                <div className="col-2">
                  <i
                    className="fa-solid fa-face-grin-stars icon"
                    onClick={() => setReview(5, 4)}
                  ></i>
                  <div className="h6 mt-1">excellent</div>
                </div>
              </div>
              <div className="mt-3">
                <textarea
                  ref={comment}
                  className="form-control"
                  placeholder="Write your review here"
                ></textarea>
              </div>
              <div className="mt-3 text-center">
                <button
                  className="btn btn-primary"
                  onClick={async () => {
                    if (rating === 0) {
                      alert("Rating is required");
                      return;
                    }
                    if (comment.current?.value === "") {
                      alert("Comment is required");
                      return;
                    }
                    const user = JSON.parse(
                      sessionStorage.getItem("user") as string
                    );
                    const review = {
                      userId: user._id,
                      animalId: selectedAnimal,
                      rating: rating,
                      comment: comment.current?.value,
                    };
                    const response = await api.post("reviews", review);
                    if (response.status === 201) {
                      toast.success("Review added successfully");
                      comment.current!.value = "";
                      // let myModal = document.getElementById(
                      //   "reviewModal"
                      // ) as HTMLElement;
                      // myModal.style.display = "none";
                      // myModal.classList.remove("show");
                      window.location.reload();
                    }
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
            {/* <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div> */}
          </div>
        </div>
      </div>
      <Toaster/>
    </>
  );
}

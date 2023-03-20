import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Task = ({ taskObj, onComplete }) => {
  const handleComplete = (id) => {
    onComplete(id);
    toast.success("Görev Tamamlandı!", {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  return (
    <div className="task">
      <h3>{taskObj.title}</h3>
      <p>{taskObj.description}</p>
      <div>
        {taskObj.people.map((p) => (
          <span className="pill" key={p}>
            {p}
          </span>
        ))}
      </div>
      {onComplete && (
        <button onClick={() => handleComplete(taskObj.id)}>Tamamlandı</button>
      )}
      <ToastContainer />
    </div>
  );
};

export default Task;

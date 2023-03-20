import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function TaskHookForm({ kisiler, submitFn }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  function onSubmit(data) {
    submitFn({
      ...data,
      id: nanoid(5),
      status: "yapılacak",
    });
    reset();
  }

  const toasty = () => {
    toast.success("Yeni Görev Başarıyla Eklendi !", {
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
    <form className="TaskHookForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-line">
        <label className="input-label">Başlık</label>
        <input
          className="input-text"
          id="title"
          name="title"
          type="text"
          placeholder="Task başlığı giriniz."
          {...register("title", {
            required: "Task başlığı girmeniz gerek",
            minLength: {
              value: 3,
              message: "Task başlığı en az 3 karakter olmalıdır.",
            },
          })}
        />
        {errors.title && <p className="input-error">{errors.title.message}</p>}
      </div>
      <div className="form-inline">
        <label className="input-label">Açıklama</label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          name="description"
          placeholder="Task açıklaması giriniz"
          {...register("description", {
            required: "Task açıklaması girmeniz gerek",
            minLength: {
              value: 10,
              message: "Task açıklaması en az 10 karakter olmalıdır.",
            },
          })}
        ></textarea>
        {errors.description && (
          <p className="input-error">{errors.description.message}</p>
        )}
      </div>

      <div className="form-line">
        <label className="input-label">Kişiler</label>
        <div>
          {kisiler.map((key) => (
            <label className="input-checkbox" key={key}>
              <input
                type="checkbox"
                name="people"
                value={key}
                {...register("people", {
                  required: {
                    value: true,
                    message: "Task için en az bir kişi seçmelisiniz.",
                  },
                })}
              />
              {key}
            </label>
          ))}
        </div>
        {errors.people && (
          <p className="input-error">{errors.people.message}</p>
        )}
      </div>
      <div className="form-line">
        <button
          className="submit-button"
          type="submit"
          disabled={!isValid}
          onClick={toasty}
        >
          Task'ı Kaydet
        </button>
        <ToastContainer
          position="bottom-left"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </form>
  );
}

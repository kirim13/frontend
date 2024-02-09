const AddPicturePost = () => {
  return (
    <form className="post_add border">
      <div className="flex flex-col gap-2">
        <label>Pet</label>
        <select></select>
      </div>
      <div className="flex flex-col gap-2">
        <label>Select Photo</label>
        <input
          type="file"
          id="post_photo"
          name="post_photo"
          accept="image/*"
          multiple
        ></input>
      </div>
      <div className="flex flex-col gap-2">
        <label>Caption</label>
        <input
          type="text"
          id="post_caption"
          name="post_caption"
          placeholder="caption"
        ></input>
      </div>
    </form>
  );
};

export default AddPicturePost;

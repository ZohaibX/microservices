import React from 'react';
import { connect } from 'react-redux';
import { uploadImage } from '../../Store/actions';

const Upload = (props: any) => {
  const [file, setFile] = React.useState(null);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log('files are: ', e.target.files);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('File is not selected');

    props.uploadImage(file); // this is the main function -- handling post request to backend and s3
    // this function is defined in -> reducer -> actions
  };

  return (
    <div className="container">
      <h1 className="text-center my-5 font-weight-bolder">
        This is Upload Page
      </h1>
      <form action="" onSubmit={onSubmit}>
        <h5>Add an image</h5>
        <input type="file" onChange={onFileChange} accept="image/*" />
        <button className="btn btn-primary">Submit</button>
      </form>
      {/* make sure we are using double quotes at type  */}
      <br />
      <img
        src={
          'https://my-first-s3-bucket-1234567.s3.amazonaws.com/' +
          '6056f758d7f23000230dd7f6/0f7356a0-8a3c-11eb-8687-6937e84f27ab.jpeg'
        }
        alt=""
      />
      {/* Second string is the key, we will get from our backend db -- as an imageUrl */}
      {/* 1st string is the bucket url and i can get this by going into bucket - inside any image */}
      {/* now, it depends on us, if we use some env variable for 1st string -- and second string will be obviously from backend - not hard coated */}
      {/* Second String Must be like userId/someUniqueKey.jpeg bcoz thats how we have set it in backend - get-url route*/}
    </div>
  );
};

const mapStateToProps = ({ imageData }) => {
  return { imageData };
};

export default {
  component: connect(mapStateToProps, { uploadImage })(Upload),
};

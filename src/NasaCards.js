import React from "react";
import "./styles.css";
import "./Nasacard.css";
import axios from "axios";
import { BounceLoader } from "react-spinners";

class NasaCards extends React.Component {
  constructor(props) {
    super(props);

    this.state = { images_list: [], isLoaded: false };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        `https://api.nasa.gov/planetary/apod?api_key=UjdTEuz2nZ9mdbac4hojt5Vx4x81h2BNERNcZtNb&count=10`
      )
      .then((res) => {
        const images = res.data;

        images.forEach((element) => {
          element.liked = false;
        });

        localStorage.setItem("local_images", images);

        this.setState({ images_list: images, isLoaded: true });
      });
  }

  handleClick(i) {
    let temp = this.state.images_list;
    temp[i].liked = !temp[i].liked;
    this.setState({ images_list: temp });
  }

  render() {
    return (
      <div className="App">
        <h1>Spacestagram</h1>

        {this.state.isLoaded ? (
          <div className="Cards">
            {this.state.images_list.map((i, index) => (
              <div className="Nasa-card">
                <h2> {i.title}</h2>
                <p> {i.date} </p>
                <img className="Nasa-card-image" alt={i.title} src={i.url} />
                <button
                  key={index}
                  className={
                    this.state.images_list[index].liked
                      ? "button-liked"
                      : "button-unliked"
                  }
                  onClick={() => this.handleClick(index)}
                >
                  LIKE
                </button>
              </div>
            ))}
          </div>
        ) : (
          <BounceLoader />
        )}
      </div>
    );
  }
}

export default NasaCards;

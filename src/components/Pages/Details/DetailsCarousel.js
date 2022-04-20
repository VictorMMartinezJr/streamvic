import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useState, useEffect } from "react";
import "./DetailsCarousel.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

// BaseURL for images
const imgUrl = "https://image.tmdb.org/t/p/original";
const unavaliable =
  "https://mychildsafetyinstitute.org/wp-content/uploads/2014/07/Profile-Photo-Unavailable.png";

const DetailsCarousel = ({ url, title }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, { signal: abortCont.signal })
      .then((resp) => {
        if (!resp.ok) {
          throw Error("Could not fetch the data for the resource");
        }
        return resp.json();
      })
      .then((data) => {
        setData(data.results || data.cast);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Fetch Aborted");
        } else {
          setError(err.message);
          setIsLoading(false);
        }
      });

    return () => {
      abortCont.abort();
    };

    // eslint-disable-next-line
  }, []);

  // Items in carousel
  const items = data.map((data) => {
    return (
      <div className="details-img-container">
        <LazyLoadImage
          effect="blur"
          className="details-carousel-img"
          src={
            data?.profile_path === null || data?.poster_path === "undefined"
              ? unavaliable
              : `${imgUrl}${data?.poster_path || data?.profile_path}`
          }
          alt={data?.title}
        />
        <h4>{data?.name || data?.title}</h4>
      </div>
    );
  });

  // Carousel Responsiveness
  const responsive = {
    0: {
      items: 1,
    },
    300: {
      items: 2,
    },
    700: {
      items: 3,
    },
    1024: {
      items: 5,
    },
  };

  // Next/Previous Buttons
  const renderNextButton = () => {
    return <i className="fas fa-arrow-right details-right"></i>;
  };

  const renderPrevButton = () => {
    return <i className="fas fa-arrow-left details-left"></i>;
  };

  return (
    <div className="details-slider-section">
      {error && <div>{error}</div>}
      {!isLoading && !error && (
        <div className="details-slider-container">
          <h2 className="details-slider-title">{title}</h2>
          <AliceCarousel
            mouseTracking
            items={items}
            responsive={responsive}
            animationDuration={600}
            infinite
            animationType="fadeout"
            autoHeight
            disableDotsControls
            renderNextButton={renderNextButton}
            renderPrevButton={renderPrevButton}
          />
        </div>
      )}
    </div>
  );
};

export default DetailsCarousel;

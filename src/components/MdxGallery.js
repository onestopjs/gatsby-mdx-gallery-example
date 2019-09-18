import React, {useState, useCallback} from 'react';
import {Row, Col} from 'reactstrap';

import Img from 'gatsby-image';
import GalleryModal from './GalleryModal';

const MdxGallery = ({images}) => {
  const [index, setIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = useCallback((i) => {
    setIndex(i);
    setModalOpen(true);
  }, [setIndex, setModalOpen]);

  const prev = useCallback(() => {
    setIndex(index === 0 ? images.length - 1 : index-1);
  }, [index, setIndex, images]);

  const next = useCallback(() => {
    setIndex(index === images.length - 1 ? 0 : index+1);
  }, [index, setIndex, images]);
  return (
    <Row>
      <GalleryModal isOpen={modalOpen} setModalOpen={setModalOpen} image={images[index]} prev={prev} next={next} />
      {images.map((img, i) => {
        if(process.env.NODE_ENV !== 'production' && !img.src) {
          console.error(`This image is missing "src", you probably messed up the path to it: ${img}`);
          return <>MISSING IMAGE</>
        }
        return (
          <Col key={i} xs="6" md="3" className="p-2">
            <button style={{border: 'none', background: 'transparent'}} className="w-100 h-100" onClick={() => handleClick(i)}>
              <Img fluid={img.src.childImageSharp.preview} />
            </button>
          </Col>
        );
      })}
    </Row>
  );
};

export default MdxGallery;

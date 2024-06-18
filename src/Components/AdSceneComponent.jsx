import React, { useEffect, useState } from 'react';

const AdSceneComponent = () => {
  const [isAdLoaded, setIsAdLoaded] = useState(false);

  useEffect(() => {
    if (!isAdLoaded) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      setIsAdLoaded(true);
    }
  }, [isAdLoaded]);

  return (
    <div className="ad-container">
      { !isAdLoaded && (
        <ins className="adsbygoogle"
             style={{ display: 'block', textAlign: 'center', minWidth: '250px' }}
             data-ad-layout="in-article"
             data-ad-format="fluid"
             data-ad-client="ca-pub-1100348415546849"
             data-ad-slot="8593716362"></ins>
      )}
    </div>
  );
};

export default AdSceneComponent;

import { useEffect, useRef, useState } from "react";
import SubmitModal from "./testComponent.tsx";

const GoogleMapComponent = () => {
  return (
    <div>
      <SubmitModal postId={10} userId={1} />
    </div>
  );
};

export default GoogleMapComponent;

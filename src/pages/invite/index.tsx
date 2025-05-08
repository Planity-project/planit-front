import { useRouter } from "next/router";

const Invite = () => {
  const router = useRouter();
  const albumName = router.query.name;

  return (
    <div>
      <h1>초대받은 앨범: {albumName}</h1>
    </div>
  );
};

export default Invite;

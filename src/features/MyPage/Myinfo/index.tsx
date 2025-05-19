import { Button, Input, Modal } from "antd";
import { MyinfoStyled } from "./styled";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import api from "@/util/api";
import { CameraOutlined } from "@ant-design/icons";
import AddBanner from "@/components/AddBanner";
interface infoprops {
  user: any;
}
const Myinfo = ({ user }: infoprops) => {
  const [name, setName] = useState<string>("");
  const [preview, setPreview] = useState<string>(
    user?.profile_img
      ? `http://localhost:5001/${user?.profile_img}`
      : "/defaultImage.png"
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (user?.nickname) {
      setName(user.nickname);
    }
  }, [user?.nickname]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };
  // 파일 업로드 미리보기 함수
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  //프로필 이미지 변경 요청
  const handleProfileUpload = async () => {
    if (!selectedFile) {
      Modal.warning({
        centered: true,
        title: "변경할 이미지를 먼저 선택하세요.",
      });
      return;
    }

    const formData = new FormData();

    formData.append("profileImage", selectedFile);
    formData.append("userId", user.id);
    try {
      const res = await api.put(`/users/me/profile-image`, formData);
      if (res.data.result) {
        Modal.warning({
          centered: true,
          title: "프로필 이미지가 성공적으로 변경되었습니다.",
        });
      }

      // 서버에서 변경된 URL을 받아서 다시 세팅할 수도 있음
    } catch (error) {
      console.error("프로필 업로드 실패:", error);
      Modal.warning({
        centered: true,
        title: "업로드에 실패했습니다.",
      });
    }
  };
  // 닉네임 변경 함수
  const changeNick = async () => {
    if (name.length < 1) {
      console.log(name);
      Modal.warning({
        centered: true,
        title: "2글자 이상 입력해주세요",
      });
      return;
    }
    if (name === user.nickname) {
      Modal.warning({
        centered: true,
        title: "이전 닉네임과 동일합니다.",
      });
      return;
    }

    try {
      await api
        .post("user/update", { nickname: name, userId: user.id })
        .then((res: any) => {
          if (res.data.result === false) {
            Modal.warning({
              centered: true,
              title: "이미 사용중인 닉네임입니다.",
            });
            return;
          }
        });
      Modal.warning({
        centered: true,
        title: "닉네임이 성공적으로 변경되었습니다.",
      });
    } catch (error) {
      console.error("닉네임 변경 실패:", error);
      Modal.warning({
        centered: true,
        title: "닉네임 변경에 실패했습니다.",
      });
    }
  };

  //프로필 이미지 삭제 요청
  const profileDelete = async () => {
    await api.delete(`/user/me/profile-image?userId=${user.id}`);
  };

  //회원탈퇴
  const userexit = async () => {
    await api.delete("user/destroy/:id");
  };

  return (
    <MyinfoStyled>
      <div className="myinfo-wrap">
        <div className="myinfo-title">내 정보</div>
        <div className="myinfo-userprofile">
          <div className="myinfo-imgDiv">
            <div className="myinfo-imgDiv" onClick={handleImageClick}>
              <div className="profile-image-container">
                <Image
                  src={preview}
                  alt="사용자 프로필"
                  className="sideBar-userProfile"
                  width={100}
                  height={100}
                />
                <div className="profile-overlay">
                  <CameraOutlined style={{ fontSize: "28px" }} />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="myinfo-btnDiv">
              <Button onClick={handleProfileUpload}>프로필 변경</Button>
            </div>
          </div>
        </div>
        <div className="myinfo-nickname">
          <div className="myinfo-detailDiv">닉네임</div>
          <div className="myinfo-nicknameChange">
            <Input
              type="text"
              className="custom-input"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Button onClick={changeNick}>닉네임 변경</Button>
          </div>
        </div>
        <div className="myinfo-useremail">
          <div className="myinfo-detailDiv">내 이메일 </div>
          <Input
            className="custom-input"
            type="text"
            value={user?.email}
            readOnly
          />
        </div>
        <div></div>
        <div className="myinfo-exit">회원 탈퇴</div>
        <div className="AddBanner">
          <AddBanner />
        </div>
      </div>
    </MyinfoStyled>
  );
};

export default Myinfo;

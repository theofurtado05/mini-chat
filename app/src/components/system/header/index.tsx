import { useState, useRef, useEffect } from "react";
import { Avatar, Header, HeaderLeft, HeaderRight, Online, SettingsIcon, Title, UserLabel, FileInput } from "./styled"

export const HeaderComponent = ({ usersOnline, userName, handleOpenModal }: { usersOnline: number, userName: string, handleOpenModal: () => void }) => {
    
    const [groupImage, setGroupImage] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const savedImage = localStorage.getItem('groupImage');
        if (savedImage) {
            setGroupImage(savedImage);
        }
    }, []);
    
    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };
    
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64 = e.target?.result as string;
                setGroupImage(base64);
                localStorage.setItem('groupImage', base64);
            };
            reader.readAsDataURL(file);
        }
    };
    
    return (
    <Header>
        <HeaderLeft>
        <Avatar onClick={handleAvatarClick}> 
            {groupImage ? (
                <img src={groupImage} alt="Group Image" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
            ) : (
                <span style={{ fontSize: '24px', color: '#6b7280' }}>📷</span>
            )}
        </Avatar>
        <FileInput
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
        />
        <div>
            <Title>Mini Chat</Title>
            <Online>{usersOnline} pessoas online</Online>
        </div>
        </HeaderLeft>
        <HeaderRight>
        <UserLabel>Usuário: <b>{userName || ""}</b></UserLabel>
        <SettingsIcon onClick={handleOpenModal}>⚙</SettingsIcon>
        </HeaderRight>
    </Header>
    )
  }
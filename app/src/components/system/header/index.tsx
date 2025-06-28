import { Avatar, Header, HeaderLeft, HeaderRight, Online, SettingsIcon, Title, UserLabel } from "./styled"

export const HeaderComponent = ({ usersOnline, userName, handleOpenModal }: { usersOnline: number, userName: string, handleOpenModal: () => void }) => {
    return (
    <Header>
        <HeaderLeft>
        <Avatar> <span> </span> </Avatar>
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
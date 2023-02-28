import TypingBoard from 'renderer/components/TypingBoard/TypingBoard';
import Screen from 'renderer/components/ui/Screen';
import FileNav from 'renderer/components/SideNav/FileNav';
import Row from 'renderer/components/ui/Row';
import Column from 'renderer/components/ui/Column';
import TypingFooter from 'renderer/components/TypingFooter/TypingFooter';
import TypingController from 'renderer/components/TypingBoard/TypingController';

export default function TypingScreen() {
  return (
    <Screen>
      <Column>
        <Row height="38px">
          <TypingController />
        </Row>
        <Row height="calc(100% - 26px - 38px)">
          <Column width="270px">
            <FileNav />
          </Column>
          <Column width="calc(100% - 270px)">
            <TypingBoard />
          </Column>
        </Row>
        <Row height="26px">
          <TypingFooter />
        </Row>
      </Column>
    </Screen>
  );
}

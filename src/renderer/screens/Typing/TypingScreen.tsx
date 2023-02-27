import TypingBoard from 'renderer/components/TypingBoard/TypingBoard';
import Screen from 'renderer/components/ui/Screen';
import FileNav from 'renderer/components/SideNav/SideNav';
import Row from 'renderer/components/ui/Row';
import Column from 'renderer/components/ui/Column';
import TypingFooter from 'renderer/components/TypingFooter/TypingFooter';

const FILE_NAV_WIDTH = 350;

export default function TypingScreen() {
  return (
    <Screen>
      <Column>
        <Row>
          <Column width={`${FILE_NAV_WIDTH}px`}>
            <FileNav />
          </Column>
          <Column>
            <TypingBoard />
          </Column>
        </Row>
        <Row height="32px">
          <TypingFooter />
        </Row>
      </Column>
    </Screen>
  );
}

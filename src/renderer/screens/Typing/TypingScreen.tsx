import TypingBoard from 'renderer/components/TypingBoard/TypingBoard';
import Screen from 'renderer/components/ui/Screen';
import FileNav from 'renderer/components/SideNav/SideNav';
import Row from 'renderer/components/ui/Row';
import Column from 'renderer/components/ui/Column';

const FILE_NAV_WIDTH = 350;

export default function TypingScreen() {
  return (
    <Screen>
      <Row>
        <Column width={`${FILE_NAV_WIDTH}px`}>
          <FileNav />
        </Column>
        <Column>
          <TypingBoard />
        </Column>
      </Row>
    </Screen>
  );
}

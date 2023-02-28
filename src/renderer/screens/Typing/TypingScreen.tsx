import TypingBoard from 'renderer/components/TypingBoard/TypingBoard';
import Screen from 'renderer/components/ui/Screen';
import FileNav from 'renderer/components/SideNav/FileNav';
import Row from 'renderer/components/ui/Row';
import Column from 'renderer/components/ui/Column';
import TypingFooter from 'renderer/components/TypingFooter/TypingFooter';
import TypingController from 'renderer/components/TypingBoard/TypingController';
import useEditor from 'renderer/hooks/states/useEditor';

export default function TypingScreen() {
  const { mode } = useEditor();

  return (
    <Screen>
      <Column>
        <Row height="38px">
          <TypingController />
        </Row>
        <Row height="calc(100% - 26px - 38px)">
          {mode === 'edit' && (
            <Column width="270px">
              <FileNav />
            </Column>
          )}
          <Column width={mode === 'edit' ? 'calc(100% - 270px)' : '100%'}>
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

import { EditorView, Decoration, DecorationSet } from '@codemirror/view';
import { StateField, StateEffect } from '@codemirror/state';

const addUnderline = StateEffect.define<{ from: number; to: number }>({
  map: ({ from, to }, change) => ({
    from: change.mapPos(from),
    to: change.mapPos(to),
  }),
});

const underlineMark = Decoration.mark({ class: 'cm-underline' });

const underlineField = StateField.define<DecorationSet>({
  create() {
    return Decoration.none;
  },
  update(underlinesIn, tr) {
    let underlines = underlinesIn.map(tr.changes);
    tr.effects.forEach((e) => {
      if (e.is(addUnderline)) {
        underlines = underlines.update({
          add: [underlineMark.range(e.value.from, e.value.to)],
        });
      }
    });

    return underlines;
  },
  provide: (f) => EditorView.decorations.from(f),
});

export default function underlineSelection(
  view: EditorView,
  ranges: { from: number; to: number }[]
) {
  const effects: StateEffect<unknown>[] = ranges.map(({ from, to }) =>
    addUnderline.of({ from, to })
  );

  if (!effects.length) return false;

  if (!view.state.field(underlineField, false)) {
    effects.push(StateEffect.appendConfig.of([underlineField]));
  }

  view.dispatch({ effects });
  return true;
}

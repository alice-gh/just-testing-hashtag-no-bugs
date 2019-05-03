'use babel';

import JustTestingHashtagNoBugsView from './just-testing-hashtag-no-bugs-view';
import { CompositeDisposable } from 'atom';

export default {

  justTestingHashtagNoBugsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.justTestingHashtagNoBugsView = new JustTestingHashtagNoBugsView(state.justTestingHashtagNoBugsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.justTestingHashtagNoBugsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'just-testing-hashtag-no-bugs:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.justTestingHashtagNoBugsView.destroy();
  },

  serialize() {
    return {
      justTestingHashtagNoBugsViewState: this.justTestingHashtagNoBugsView.serialize()
    };
  },

  toggle() {
    console.log('JustTestingHashtagNoBugs was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};

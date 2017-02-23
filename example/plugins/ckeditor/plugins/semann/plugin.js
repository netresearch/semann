/*
 * CKEditor Semann plugin
 *
 * @author  André Lademann <andre.lademann@netresearch.de>
 * @license MIT License
 * @link    https://opensource.org/licenses/MIT
 * @version 0.0.1
 *
 */

CKEDITOR.plugins.add('semann', {
    icons: 'semann',
    init: function (editor) {
        editor.ui.addButton('Semann', {
            label: 'Insert Semann',
            command: 'insertSemann',
            toolbar: 'other'
        });

        editor.addCommand('insertSemann', {
            exec: function (editor) {
                document.semann.enhance(editor.getData());
            }
        });
    }
});

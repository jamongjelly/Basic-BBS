import ReactQuill from 'react-quill';
import { addPostAttachment } from 'src/lib/api/postAPI';

export const imageHandler = (reactQuill: ReactQuill | null) => {
    if (!reactQuill) return;

    const quill = reactQuill.getEditor();

    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
        if (!input.files) return;

        const file = input.files[0];
        const formData = new FormData();

        formData.append('file', file);

        const range = quill.getSelection(true);
        console.log(range);

        quill.insertEmbed(
            range.index,
            'image',
            'https://bohoon.co.kr/wp-content/uploads/sites/42/2020/04/placeholder.png'
            // `${window.location.origin}/images/loaders/placeholder.jpg`
        );

        quill.setSelection(range.index + 1, range.length);

        const postId = 1;
        const res = await addPostAttachment({ postId, formData });

        quill.deleteText(range.index, 1);

        quill.insertEmbed(range.index, 'image', res);
    };
};

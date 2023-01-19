import React, { useRef } from 'react';
import * as clipboard from 'clipboard-polyfill';

const Index: React.FC = () => {
    const richTextDiv = useRef(null);
    const handler = async () => {
        //console.log('Previous clipboard contents:', await clipboard.read());
        const html = richTextDiv.current.innerHTML;
        const text = richTextDiv.current.innerText;
        const item = new clipboard.ClipboardItem({
            'text/html': new Blob([html], {
                type: 'text/html'
            }),
            'text/plain': new Blob(['fallback' + text], { type: 'text/plain' })
        });
        await clipboard.write([item]);
    };
    const handler2 = () => {
        window.getSelection().selectAllChildren(richTextDiv.current);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
    };

    return (
        <>
            <button onClick={handler}>copy</button>&nbsp;&nbsp;&nbsp;
            <button onClick={handler2}>copy2</button>
            <div ref={richTextDiv}>
                <ul>
                    <li>
                        <span style={{ display: 'inline-block', width: '500px' }}>充值单号</span>
                        <span style={{ display: 'inline-block', width: '200px' }}>金额</span>
                        <span style={{ display: 'inline-block', width: '300px' }}>时间</span>
                    </li>
                    <li>
                        <span style={{ display: 'inline-block', width: '500px' }}>充值单号1111111111111</span>
                        <span style={{ display: 'inline-block', width: '200px' }}>20</span>
                        <span style={{ display: 'inline-block', width: '300px' }}>2022-12-20</span>
                    </li>
                    <li>
                        <span style={{ display: 'inline-block', width: '500px' }}>充值单号222222</span>
                        <span style={{ display: 'inline-block', width: '200px' }}>5000000000</span>
                        <span style={{ display: 'inline-block', width: '300px' }}>2022-12-20</span>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Index;

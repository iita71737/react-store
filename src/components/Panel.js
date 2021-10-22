import React from 'react';
import { render } from 'react-dom';


//     1. 一次渲染，随需调用
//      2. 装载组件
//           (1)、子组件作为参数传递并被渲染
//         (2)、子组件可以关闭弹出层
//           (3)、子组件与调用者可以通讯


class Panel extends React.Component {
    state = {
        active: false,
        component: null,
        callback: () => { }
    };

    open = options => {
        const { component, callback } = options;
        const _key = new Date().getTime();
        const _component = React.createElement(component, {
            close: this.close,
            key: _key
        });
        this.setState({
            active: true,
            component: _component,
            callback: callback
        });
    };

    close = data => {
        this.setState({
            active: false
        });
        this.state.callback(data);
        //console.log('this.state.callback:', this.state.callback(data))
    };

    render() {
        const _class = {
            true: 'panel-wrapper active',
            false: 'panel-wrapper'
        };
        return (
            <div className={_class[this.state.active]}>
                <div className="over-layer" onClick={this.close}></div>
                <div className="panel">
                    <div className="head">
                        <span className="close" onClick={this.close}>
                            ×
                        </span>
                        {this.state.component}
                    </div>
                </div>
            </div>
        );
    }
}

const _div = document.createElement('div');
document.body.appendChild(_div);

const _panel = render(<Panel />, _div);
console.log(_panel);
export default _panel;
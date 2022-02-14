import { Col, Radio, Row, Tabs } from "antd";
import React from "react";
import { IBlockTag } from "src/commons/interface";

// import publicStyles from 'src/commons/styles/public.module.scss'
import styles from '../styles/Discuss.module.scss'

const { TabPane } = Tabs;

interface IDiscussProp {

}

interface IDiscussState {
  currentBlock: string;
}

class Discuss extends React.Component<IDiscussProp, IDiscussState> {
  blockTags: Array<IBlockTag>;

  constructor(props: IDiscussProp) {
    super(props);

    this.blockTags = [
      { name: 'all', display: '全部' }, { name: 'admin', display: '站务' }, { name: 'water', display: '灌水区' },
      { name: 'academic', display: '学术版' }
    ];

    this.state = {
      currentBlock: 'all'
    }
  }

  render() {
    return (
      <div className={styles['content_large']}>

        <Row gutter={16}>
          <Col span={18}>
            <div className={styles['discussion_list']}>
              <Tabs
                defaultActiveKey="1"
                onChange={() => { }}
                size='large'
              >
                <TabPane tab="最新" key="1" >

                </TabPane>
                <TabPane tab="最热" key="2">

                </TabPane>
                <TabPane tab="精选" key="3">

                </TabPane>
              </Tabs>
            </div>
          </Col>

          <Col span={6}>
            <div className={styles['label_list']}>
              <div className={styles['label_list_header']}>
                <h2 style={{fontWeight: 'bold'}}>选择板块</h2>
              </div>
              <div>
                <Radio.Group defaultValue='all' style={{marginTop: 10}}>
                  {
                    this.blockTags.map((value, index) =>
                      <Radio.Button
                        value={value.name}
                        style={{margin: '0 10px 15px 0'}}
                      >
                        {value.display}
                      </Radio.Button>
                    )
                  }
                </Radio.Group>
              </div>
            </div>
          </Col>
        </Row>

      </div>
    );
  }
}

export default Discuss;
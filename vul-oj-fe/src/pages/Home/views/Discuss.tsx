import { Button, Col, Radio, Row, Tabs } from "antd";
import Search from "antd/lib/input/Search";
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

  handleSearch = (value: string) => {
    console.log(value);
  }

  render() {
    const newPost = <Button shape="round">发表帖子</Button>;

    return (
      <div className={styles['content_large']}>

        <Row gutter={16}>
          <Col span={18}>
            <div className={styles['search_discussion']}>
              <Search
                placeholder="键入帖子标题或内容"
                allowClear
                enterButton="搜索帖子"
                size="large"
                onSearch={this.handleSearch}
              />
            </div>
            <div className={styles['discussion_list']}>
              <Tabs
                defaultActiveKey="1"
                tabBarExtraContent={newPost}
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
                <h2 style={{ fontWeight: 'bold' }}>选择板块</h2>
              </div>
              <div>
                <Radio.Group defaultValue='all' style={{ marginTop: 10 }}>
                  {
                    this.blockTags.map((value, index) =>
                      <Radio.Button
                        key={index}
                        value={value.name}
                        style={{ margin: '0 10px 15px 0' }}
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
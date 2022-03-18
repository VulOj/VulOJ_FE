import React from "react";

import styles from "../styles/Problem.module.scss";

import ProblemList from "../components/ProblemList";

import { Input, Select } from "antd";
const { Search } = Input
const { Option } = Select



class Problem extends React.Component {
  render() {
    return (
      <div className={styles['content_large']}>

        {/* search_box模块 */}
        <div className={styles['search_module']}>
          <div>
            <h2>搜索题目</h2>

            <Search
              className={styles['search_box']}
              placeholder="输入题目名称/序号"
              allowClear={true}
              maxLength={30}
              enterButton
              onSearch={() => { }}                //待补全
            />
          </div>

          <div>
            <Select
              className={styles['search_difficulty']}
              allowClear={true}
              placeholder="难度"
            >
              <Option value="all">普通</Option>
              <Option value="all">稀有</Option>
              <Option value="all">史诗</Option>
              <Option value="all">传说</Option>
            </Select>

            <Select
              className={styles['search_tags']}
              mode="tags"
              placeholder="算法标签"
              allowClear={true}
              maxTagCount={5}
              maxTagTextLength={8}
              style={{ width: '100%' }}
            >
              <Option value="1">贪心</Option>
              <Option value="5">递归</Option>
              <Option value="7">字典树</Option>
              <Option value="8">AC自动机</Option>
            </Select>
          </div>
        </div>

        {/* 题目列表模块 */}


        {/*传入数据说明：
        state:
        0: 该题目未被尝试
        1：该题目已被通过
        2：该题目已被尝试但未被通过

        title:
        参数1：题目名称
        参数2：题目路径

        difficult:
        字符串类型，分别为：
        common:    普通，白色
        rare:      稀有，蓝色
        epic:      史诗，紫色
        legendary: 传说，橙色

        tags:
        字符串数组
        ！！！如果有多个tag，最多传入3个

        passRate:
        整数数组，第一个参数为通过次数，第二个参数为提交总数 */}


        <ProblemList data={[
          { state: 0, title: ['a+b Problem', "#"], difficulty: 'legendary', tags: ['高精度', '入门'], passRate: [20, 100] },
          { state: 1, title: ['小凯的疑惑', "#"], difficulty: 'rare', tags: ['数学', 'NOIP'], passRate: [23, 402] },
          { state: 2, title: ['斗主地', "#"], difficulty: 'epic', tags: ['模拟', 'NOI', '高难度'], passRate: [60, 70] },
          { state: 0, title: ['sby出的题', "#"], difficulty: 'common', tags: ['入门'], passRate: [300, 300] },
          { state: 0, title: ['a+b Problem', "#"], difficulty: 'legendary', tags: ['高精度', '入门'], passRate: [20, 100] },
          { state: 1, title: ['小凯的疑惑', "#"], difficulty: 'rare', tags: ['数学', 'NOIP'], passRate: [23, 402] },
          { state: 2, title: ['斗主地', "#"], difficulty: 'epic', tags: ['模拟', 'NOI', '高难度'], passRate: [60, 70] },
          { state: 0, title: ['sby出的题', "#"], difficulty: 'common', tags: ['入门'], passRate: [300, 300] },
          { state: 0, title: ['a+b Problem', "#"], difficulty: 'legendary', tags: ['高精度', '入门'], passRate: [20, 100] },
          { state: 1, title: ['小凯的疑惑', "#"], difficulty: 'rare', tags: ['数学', 'NOIP'], passRate: [23, 402] },
          { state: 2, title: ['斗主地', "#"], difficulty: 'epic', tags: ['模拟', 'NOI', '高难度'], passRate: [60, 70] },
          { state: 0, title: ['sby出的题', "#"], difficulty: 'common', tags: ['入门'], passRate: [300, 300] },
          { state: 0, title: ['a+b Problem', "#"], difficulty: 'legendary', tags: ['高精度', '入门'], passRate: [20, 100] },
          { state: 1, title: ['小凯的疑惑', "#"], difficulty: 'rare', tags: ['数学', 'NOIP'], passRate: [23, 402] },
          { state: 2, title: ['斗主地', "#"], difficulty: 'epic', tags: ['模拟', 'NOI', '高难度'], passRate: [60, 70] },
          { state: 0, title: ['sby出的题', "#"], difficulty: 'common', tags: ['入门'], passRate: [300, 300] },
        ]}></ProblemList>
      </div >
    )
  }
}

export default Problem;
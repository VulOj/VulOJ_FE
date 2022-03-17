import React from "react";

import styles from "../styles/ProblemList.module.scss";


import { Input, Select } from "antd";
const { Search } = Input
const { Option } = Select



class ProblemList extends React.Component {
  render() {
    return (
      <div className={styles['content_large']}>

        {/* search_box模块 */}
        <div className={styles['card']}>
          <div className={styles['search_module']}>
            <h2>搜索题目</h2>

            <Search
              className={styles['search_box']}
              placeholder="输入题目名称/序号"
              allowClear={true}
              maxLength={30}
              enterButton
              onSearch={() => { }}                //待补全
            />

            <Select
              className={styles['search_difficulty']}
              placeholder="难度"
            >
              <Option value="all">难度1</Option>
            </Select>

            <Select
              className={styles['search_tags']}
              mode="tags"
              placeholder="算法标签"
              maxTagCount={2}
              maxTagTextLength={6}
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
        <div className={styles['card']}>
          <table></table>
        </div>
      </div >
    )
  }
}

export default ProblemList;
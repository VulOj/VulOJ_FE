import styles from "../styles/ProblemList.module.scss"

import { Tag, Table } from "antd"

interface IProblemListProps {
  data: IListItem[]
}

interface IListItem {
  state: number,
  title: string[],
  difficulty: string,
  tags: string[],
  passRate: number[]
}

const difficultyColorMap: { [key: string]: string } = {
  common: '#cccccc',
  rare: '#69c0ff',
  epic: '#b37feb',
  legendary: '#ffc53d'
}

const difficultyNameMap: { [key: string]: string } = {
  common: '普通',
  rare: '稀有',
  epic: '史诗',
  legendary: '传说'
}

const statePictureMap = [
  "甘",
  "文",
  "崔"
]

const columns: any = [
  {
    title: '状态',
    dataIndex: 'state',
    width: '60px',
    align: 'center',
    render: (state: number) => {
      return <> {statePictureMap[state]} </>
    }
  },
  {
    title: '题目',
    dataIndex: 'title',
    render: (titleWithAddr: string[]) => {

      if (titleWithAddr.length != 2) {
        console.error('ProblemList: Problem title has a wrong parameter. Please chechout data from server.');
        return
      }

      return (
        <a href={titleWithAddr[1]}>{titleWithAddr[0]}</a>
      )
    }
  },
  {
    title: '难度',
    dataIndex: 'difficulty',
    width: '100px',
    align: 'center',
    render: (difficulty: string) => {
      return (
        <div className={styles['difficulty_box']}
          style={{ background: difficultyColorMap[difficulty] }}
        >
          {difficultyNameMap[difficulty]}
        </div>
      )
    }
  },
  {
    title: '算法标签',
    dataIndex: 'tags',
    width: '240px',
    render: (tags: string[]) => {
      return (
        <>
          {tags.map((tag: string) => {
            return (
              <Tag key={tag}>{tag}</Tag>
            )
          })}
        </>
      )
    }
  },
  {
    title: '通过率',
    dataIndex: 'passRate',
    width: '100px',
    align: 'center',
    render: (passRate: number[]) => {
      return (
        <>
          <span style={{ color: 'green' }}>{passRate[0]}</span> <span>{'/' + passRate[1]}</span>
        </>
      );
    }
  }
]

function ProblemList(props: IProblemListProps) {
  const { data } = props;

  return (
    <Table className={styles['problem_list_content']}
      columns={columns}
      dataSource={data}
      pagination={{ position: ['bottomCenter'] }}
      size='small'
    />
  )
}

export default ProblemList
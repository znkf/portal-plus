import request from "../utils/request";
const urls = {
  statistics: "/ping/apis/statistics",
  evalCount: "/ping/apis/entity/eval/count",
  positions: "/ping/apis/tag/positions",
  evaltypes: "/ping/apis/evals/stars",
  evals: "/ping/apis/evals"
};
// 获取星评分
// http://zwfw-new.hunan.gov.cn/ping/apis/statistics?
// regionCode = 430100000000 & startTime=20200501000000 & endTime=20200531235959 & evalEntityCode=egovAffair & type=1 & pageNo=1 & pageSize=2000 & avgScoreSort=desc
export function getStatistics(parameter) {
  return request({
    url: urls.statistics,
    method: "get",
    params: parameter
  });
}
// http://zwfw-new.hunan.gov.cn/ping/apis/entity/eval/count?
// regionCode = 430100000000 & startTime=20200501000000 & endTime=20200531235959 & type=1

export function getEvalCount(parameter) {
  return request({
    url: urls.evalCount,
    method: "get",
    params: parameter
  });
}
// http://zwfw-new.hunan.gov.cn/ping/apis/tag/positions
// ?regionCode = 430100000000 & startTime=20200501000000 & endTime=20200531235959 & evalEntityCode=hallAffair & type=1 & pageNo=1 & pageSize=5
export function getPositions(parameter) {
  return request({
    url: urls.positions,
    method: "get",
    params: parameter
  });
}
// ?regionCode = 430100000000 & evalEntityCode=hallAffair & startTime=20200501000000 & endTime=20200531235959
export function gerEvalType(parameter) {
  return request({
    url: urls.evaltypes,
    method: "get",
    params: parameter
  });
}
// ?regionCode = 430100000000 & startTime=20200501000000 & evalEntityCode=hallAffair & endTime=20200531235959 & pageSize=5 & pageNo=1 & generalStars=5
// & commentFromPage=undefined & pageOperation=dn & lastRecord=
export function getEvals(parameter) {
  return request({
    url: urls.evals,
    method: "get",
    params: parameter
  });
}


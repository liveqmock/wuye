package com.property.base.ebo;
import com.model.hibernate.property.BillItem;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.model.hibernate.property.FeesInfo;
import com.model.hibernate.property.FeesTypeItem;
import com.model.hibernate.property.ResidentInfo;
import com.property.base.ebi.UnitFeesEbi;
import com.property.base.vo.UnitViewInfo;
import com.ufo.framework.common.core.utils.AppUtils;
import com.ufo.framework.common.core.web.ModuleServiceFunction;
import com.ufo.framework.common.core.web.SortParameter;
import com.ufo.framework.system.ebi.Ebi;
import com.ufo.framework.system.repertory.SqlModuleFilter;
import com.ufo.framework.system.shared.module.DataFetchResponseInfo;

@Service
public class UniteFeesEbo implements UnitFeesEbi {

	@Resource(name="ebo")
	private Ebi ebi;
	public Ebi getEbi() {
		return ebi;
	}
	public void setEbi(Ebi ebi) {
		this.ebi = ebi;
	}

	/**
	 * 返回单元信息
	 * @param navigates
	 * @param sort
	 * @param moduleType
	 * @return
	 */
	public DataFetchResponseInfo loadUnit(String navigates,String orderSql,String moduleType){
	DataFetchResponseInfo responseInfo=new DataFetchResponseInfo();
	//String sorts=ModuleServiceFunction.getSortParam(sort);
	List<SqlModuleFilter> navigateFilters=ModuleServiceFunction.changeToNavigateFilters(navigates);
	String whereSql=" ";
	if("1".equals(moduleType)){
		   String value= navigateFilters.get(0).getEqualsValue();
		   whereSql+=" tf_levelInfo="+value;
	}else if("0".equals(moduleType)){
		 String value= navigateFilters.get(0).getEqualsValue();
		   whereSql+=" tf_levelInfo.tf_parent="+value;
	}
	String hql=" from ResidentInfo where 1=1 and"+whereSql+" "+orderSql;
	String  countHql=" select count(*) from ResidentInfo where 1=1 and "+whereSql;
	 try {
		 List<UnitViewInfo> views=new ArrayList<UnitViewInfo>();
	    Integer totalRows=ebi.getCount(countHql);
		List<ResidentInfo> list= (List<ResidentInfo>) ebi.queryByHql(hql);
		views=list.parallelStream().map(item->{
			UnitViewInfo view=new UnitViewInfo();
			view.setIamgUrl("images/phones/Audiovox-CDM8600.png");
			view.setRid(item.getTf_residentId());
			view.setRname(item.getTf_residentName());
			view.setStateFees("1".equals(item.getTf_stateFees())?"欠费":"");
			view.setStateOccupancy("1".equals(item.getTf_stateOccupancy())?"入住":"");
			view.setStateRepair("1".equals(item.getTf_stateRepair())?"报修":"");
			view.setNumber(item.getTf_number());
			return  view;
		}).collect(Collectors.toList());
		responseInfo.setTotalRows(totalRows);
		responseInfo.setMatchingObjects(views);
	} catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	return responseInfo;
	}
	
	/**
	 * 产生用欠费信息
	 * @throws Exception 
	 */
public 	DataFetchResponseInfo loadUniteFees(int rid) throws Exception{
	DataFetchResponseInfo reuslt=new DataFetchResponseInfo();
	String hql_ft=" from FeesTypeItem where 1=1 and tf_ResidentInfo="+rid;
	SimpleDateFormat sdd=new SimpleDateFormat("yyyy-MM-dd");
	SimpleDateFormat sdm=new SimpleDateFormat("yyyy-MM");
	String endTime=sdd.format(new Date());
	String endMonth=sdm.format(new Date());
	List<FeesTypeItem> fessItems=(List<FeesTypeItem>) ebi.queryByHql(hql_ft);
	//遍历业主收费项目
	fessItems.forEach(item->{
	String start=item.getTf_beginDate();
	String end=item.getTf_endDate();
	int reslut= endMonth.compareTo(end);
	String startDate=start+"-01";
	String endDate=end+"-01";
	List<BillItem> bills=new ArrayList<>();
	if(reslut<0){
		endDate=endTime;
	}
	//取得至今收费周期
	List<String> months=AppUtils.getMonthList(startDate, endDate);
	for(String m : months){
		String nchql=" select count(*) from BillItem where 1=1 and tf_state='1' and tf_feesDate='"+m+"'";
		String ochql=" select count(*) from BillItem where 1=1 and tf_state='0' and tf_feesDate='"+m+"'";
		String ohql="from BillItem where 1=1 and tf_state='0' and tf_feesDate='"+m+"'";
		Integer count=0;
		try {
		 count=ebi.getCount(nchql);
		 if(count==1){
			 continue;//如果已经收过了不添加
		 }else{
		  count=ebi.getCount(ochql);
		     if(count==1){
			    List<BillItem> listItem= (List<BillItem>) ebi.queryByHql(ohql);
			    bills.add(listItem.get(0));//如何没收但是记录已经经存在则添加
		    }else{
		    	//如何未收但是记录不存在产生一条收费记录
		    	BillItem bill=new BillItem();
		    	bill.setTf_feesDate(m);//收费周期
		    	bill.setTf_FeesInfo(item.getTf_FeesInfo());//收费标准
		    	bill.setTf_state("0");//收费状态
		    	bill.addXcode();//物业标示
		    	String feesType=item.getTf_FeesInfo().get
		    	//////////////////////查找当月的 电表 水表 煤气表 //////////////////////////////
		    	String mhql="from MeterInfo where 1=1 and  tf_rendDate='"+m+"' and tf_FeesInfo="+item.getTf_FeesInfo().getTf_feesid()+" and tf_ResidentInfo="+rid;
		    	//找不到 是其他费用如物业费 或本月没有结束抄表
		    	
		    	
		    	
		    	
		    	
		    	
		    	
		    	
		    	
		    	
		    	
		    	
		    	
		    	
		    	
		    	
		    	
		    }
		  
		 }
			 
		 
		 
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
		
		
	});
	return reuslt;
}
	
	
}
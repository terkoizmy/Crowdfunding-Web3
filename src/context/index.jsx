import React, { useContext, createContext, useEffect } from 'react'
import { useAddress, useContract, useMetamask, useContractWrite, useContractRead } from '@thirdweb-dev/react'
import { ethers } from 'ethers'

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract(import.meta.env.VITE_CONTRACT_ADDRESS);
    const { mutateAsync: createCampaign } = useContractWrite(contract, "createCampaign")

    const address = useAddress();
    const connect = useMetamask();
    
    const publishCampaign = async (form) => {
        try{

            const data = await createCampaign({ args:[
                address, // owner campaign
                form.title, // title
                form.description, //dess
                form.target, //target
                new Date(form.deadline).getTime(), // deadline
                form.image // img url
            ]})

            console.log("contract call success", data)
        }catch(err){
            console.log("contract call error",err)
        }
    }

    const getCampaigns = async () => {
        try{
            const data = await contract.call("getCampaigns")
            const parsedCampaigns = data.map((campaign, i) => ({
                owner: campaign.owner,
                title: campaign.title,
                description: campaign.description,
                target: ethers.utils.formatEther(campaign.target.toString()),
                deadline: campaign.deadline.toNumber(),
                amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
                image: campaign.image,
                pId: i

            }))
            return parsedCampaigns
        }catch(err){
            console.log("contract call error",err)
        }
    }

    const getUserCampaigns = async () => {
        try{
            const allCampaigns = await getCampaigns()
            const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner == address)
        
            return filteredCampaigns
        }catch(err){
            console.log(err)
        }
    }

    const donate = async (pId, amount) => {
        try{
            const data = await contract.call('donateToCampaign', [pId], {
                value: ethers.utils.parseEther(amount)
            })

            return data
        }catch(err){
            console.log(err)
        }
        
    }

    const getDonations = async (pId) => {
        try{
            const donations = await contract.call('getDonators', [pId])
            const numberOfDonations = donations[0].length
            const parsedDonations = []
            for (let i = 0; i<numberOfDonations; i++) {
                parsedDonations.push({
                    donator: donations[0][i],
                    donations: ethers.utils.formatEther(donations[1][i].toString())
                })
            }
            return parsedDonations
        }catch(err){
            console.log(err)
        }
    }

    return (
        <StateContext.Provider value={{address, contract, 
        connect, createCampaign: publishCampaign, getCampaigns, 
        getUserCampaigns, donate, getDonations }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)
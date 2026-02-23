-- Greenzone420 Loading Screen
-- ESX Legacy compatible shutdown handler

-- Primary: Wait until the player is fully active, then shut down loading screen
Citizen.CreateThread(function()
    while not NetworkIsPlayerActive(PlayerId()) do
        Citizen.Wait(500)
    end
    ShutdownLoadingScreenNui()
end)

-- Fallback: Also listen for the ESX player loaded event
RegisterNetEvent('esx:playerLoaded')
AddEventHandler('esx:playerLoaded', function(xPlayer)
    ShutdownLoadingScreenNui()
end)
